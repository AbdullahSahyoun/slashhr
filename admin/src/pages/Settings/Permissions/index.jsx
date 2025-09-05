import React from "react";
import Sidebar from "../../../components/common/Sidebar";
import { Wrench } from "lucide-react";

const UnderProgress = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Wrench className="w-16 h-16 text-yellow-500 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Page Under Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We’re working hard to bring this page to life. Please check back
            later!
          </p>
        </div>
      </main>
    </div>
  );
};

export default UnderProgress;
