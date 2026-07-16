import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backarrow from "../assets/backarrowicon.svg";

interface SettingsViewProps {
  onNavigate?: (view: "profile") => void;
}

const SettingsView: React.FC<SettingsViewProps> = () => {
  const navigate = useNavigate();
  const [accountSettings, setAccountSettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    dashboardNotifications: true,
    weeklyEmailReports: true,
    systemAlerts: true,
    loginAlerts: false,
  });

  const toggleAccountSetting = (key: keyof typeof accountSettings) => {
    setAccountSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleNotificationSetting = (
    key: keyof typeof notificationSettings
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap md:items-center items-start justify-between">
        <div className="flex items-start gap-4 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            <img src={backarrow} alt="" />
            <p className="font-normal md:text-sm text-xs">Back</p>
          </button>
          <div className="flex items-start gap-1 flex-col lg:max-w-3/6 max-w-auto">
            <h1
              className={`text-2xl font-bold text-gray-900 tracking-tight md:mb-2 mb-1`}
            >
              Settings
            </h1>
            <p className={`text-sm text-gray-500 font-medium`}>
              Manage your account preferences and system configuration
            </p>
          </div>
        </div>
        <button className="md:px-4 ml-auto md:mt-0 mt-4 py-2.5 bg-[#2563EB] text-white rounded-lg hover:opacity-90 transition-opacity md:text-sm text-xs font-normal min-w-[128px] w-fit">
          Save All Settings
        </button>
      </div>

      <h3 className="text-base font-bold text-gray-900 lg:my-1">
        Account Settings
      </h3>
      <div className="bg-white  lg:rounded-xl rounded-lg lg:p-6 p-3 border border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Two Factor Authentication
            </h4>
            <p className="text-xs text-gray-500">
              Add an extra layer to your account
            </p>
          </div>
          <button
            onClick={() => toggleAccountSetting("twoFactorAuth")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${accountSettings.twoFactorAuth ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${accountSettings.twoFactorAuth
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Email Notifications
            </h4>
            <p className="text-xs text-gray-500">
              Receive notification via email
            </p>
          </div>
          <button
            onClick={() => toggleAccountSetting("emailNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${accountSettings.emailNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${accountSettings.emailNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              SMS Notifications
            </h4>
            <p className="text-xs text-gray-500">
              Receive notification via SMS
            </p>
          </div>
          <button
            onClick={() => toggleAccountSetting("smsNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${accountSettings.smsNotifications ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${accountSettings.smsNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-900 lg:my-1">
        Notification Settings
      </h3>
      <div className="bg-white  lg:rounded-xl rounded-lg lg:p-6 p-3 border border-gray-100 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Dashboard Notifications
            </h4>
            <p className="text-xs text-gray-500">
              Show notifications in the dashboard
            </p>
          </div>
          <button
            onClick={() => toggleNotificationSetting("dashboardNotifications")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.dashboardNotifications
                ? "bg-blue-600"
                : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.dashboardNotifications
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Weekly Email Reports
            </h4>
            <p className="text-xs text-gray-500">
              Receive weekly summary reports via email
            </p>
          </div>
          <button
            onClick={() => toggleNotificationSetting("weeklyEmailReports")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.weeklyEmailReports
                ? "bg-blue-600"
                : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.weeklyEmailReports
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              System Alerts
            </h4>
            <p className="text-xs text-gray-500">
              Receive critical system alerts
            </p>
          </div>
          <button
            onClick={() => toggleNotificationSetting("systemAlerts")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.systemAlerts ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.systemAlerts
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Login Alerts wia Mail
            </h4>
            <p className="text-xs text-gray-500">
              Get notified when new Login register
            </p>
          </div>
          <button
            onClick={() => toggleNotificationSetting("loginAlerts")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationSettings.loginAlerts ? "bg-blue-600" : "bg-gray-200"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationSettings.loginAlerts
                  ? "translate-x-6"
                  : "translate-x-1"
                }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
