// _notification/models/models.js  (ESM)
const TABLE = '"user"."tblNotification"';
const EMP_TABLE = 'organization."tblEmployee"';

export default function NotificationModel(fastify) {
  const { pg } = fastify;

  // Resolve UserID from EmployeeID
  async function getUserIdByEmployeeId(employeeId) {
    const client = await pg.connect();
    try {
      const { rows } = await client.query(
        `SELECT e."UserID"
           FROM ${EMP_TABLE} e
          WHERE e."EmployeeID" = $1`,
        [employeeId]
      );
      if (!rows.length || rows[0].UserID == null) {
        throw new Error('No linked UserID for this EmployeeID');
      }
      return rows[0].UserID;
    } finally {
      client.release();
    }
  }

  // List notifications for an employee (optional status, with pagination)
  async function listByEmployeeId({ employeeId, status = null, limit = 50, offset = 0 }) {
    const userId = await getUserIdByEmployeeId(employeeId);
    const client = await pg.connect();
    try {
      if (status) {
        const { rows } = await client.query(
          `SELECT "NotificationID","TenantID","UserID","Title","Message",
                  "RelatedEntityType","RelatedEntityID","Status","CreatedAt","ReadAt"
             FROM ${TABLE}
            WHERE "UserID" = $1 AND "Status" = $2
            ORDER BY "CreatedAt" DESC
            LIMIT $3 OFFSET $4`,
          [userId, status, limit, offset]
        );
        return rows;
      } else {
        const { rows } = await client.query(
          `SELECT "NotificationID","TenantID","UserID","Title","Message",
                  "RelatedEntityType","RelatedEntityID","Status","CreatedAt","ReadAt"
             FROM ${TABLE}
            WHERE "UserID" = $1
            ORDER BY "CreatedAt" DESC
            LIMIT $2 OFFSET $3`,
          [userId, limit, offset]
        );
        return rows;
      }
    } finally {
      client.release();
    }
  }

  // Get a single notification
  async function getById(notificationId) {
    const client = await pg.connect();
    try {
      const { rows } = await client.query(
        `SELECT "NotificationID","TenantID","UserID","Title","Message",
                "RelatedEntityType","RelatedEntityID","Status","CreatedAt","ReadAt"
           FROM ${TABLE}
          WHERE "NotificationID" = $1`,
        [notificationId]
      );
      return rows[0] || null;
    } finally {
      client.release();
    }
  }

  // Insert a notification for an employee
  async function insertForEmployee({
    tenantId,
    employeeId,
    title,
    message,
    relatedEntityType = null,
    relatedEntityID = null,
    status = 'Unread'
  }) {
    const userId = await getUserIdByEmployeeId(employeeId);
    const client = await pg.connect();
    try {
      const { rows } = await client.query(
        `INSERT INTO ${TABLE}
           ("TenantID","UserID","Title","Message","RelatedEntityType","RelatedEntityID","Status","CreatedAt")
         VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
         RETURNING "NotificationID","TenantID","UserID","Title","Message",
                   "RelatedEntityType","RelatedEntityID","Status","CreatedAt","ReadAt"`,
        [tenantId, userId, title, message, relatedEntityType, relatedEntityID, status]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  // Mark as read
  async function markAsRead(notificationId) {
    const client = await pg.connect();
    try {
      const { rows } = await client.query(
        `UPDATE ${TABLE}
            SET "Status" = 'Read', "ReadAt" = NOW()
          WHERE "NotificationID" = $1
        RETURNING "NotificationID","Status","ReadAt"`,
        [notificationId]
      );
      return rows[0] || null;
    } finally {
      client.release();
    }
  }

  // Delete by id
  async function deleteById(notificationId) {
    const client = await pg.connect();
    try {
      const { rowCount } = await client.query(
        `DELETE FROM ${TABLE} WHERE "NotificationID" = $1`,
        [notificationId]
      );
      return rowCount > 0;
    } finally {
      client.release();
    }
  }

  return {
    listByEmployeeId,
    getById,
    insertForEmployee,
    markAsRead,
    deleteById
  };
}
