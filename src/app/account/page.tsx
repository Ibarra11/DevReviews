import {
  ExclamationTriangleIcon,
  PersonIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
export default async function AccountPage() {
  return (
    <div>
      <h2 className="text-3xl text-gray-800 font-bold mb-10">
        Account Settings
      </h2>
      <div className="flex items-start gap-8">
        <div className="flex flex-col gap-8">
          <ProfileDetails />
          <DeleteAccount />
        </div>

        <div className="min-w-96">
          <ResetPassword />
        </div>
      </div>
    </div>
  );
}

function DeleteAccount() {
  return (
    <div className="bg-gray-200 rounded p-8">
      <div className=" size-12 bg-gray-100 rounded-full grid place-content-center mb-4">
        <ExclamationTriangleIcon className="text-gray-400 size-5" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Delete Account
      </h3>
      <p className="text-gray-500 text-xs leading-4 mb-4">
        Deleting your account will remove all your information from our system.
        This can't be undone
      </p>

      <button className="outline outline-2 outline-gray-400 p-2 max-w-24 w-full">
        Delete
      </button>
    </div>
  );
}

function ResetPassword() {
  return (
    <div className="bg-gray-200 rounded p-8">
      <div className=" size-12 bg-gray-100 rounded-full grid place-content-center mb-4">
        <LockClosedIcon className="text-gray-400 size-5" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Change Password
      </h3>
      <div className="space-y-2 mb-4">
        <p className="text-sm leading-none">Password Requirements:</p>
        <ul className="text-xs leading-none flex flex-col gap-2">
          <li>Must contain atleast 8 characters</li>
          <li>A number (0-9)</li>
          <li>A special character</li>
          <li>Must include a uppercase character (A-Z)</li>
          <li>Must include a lowercase character (a-z)</li>
        </ul>
      </div>
      <form className="space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col flex-1 gap-1">
            <label
              htmlFor="currentPassword"
              className="text-sm text-gray-700 font-bold"
            >
              Current Password
            </label>
            <input
              className="p-2 rounded"
              type="password"
              id="currentPassword"
            />
          </div>
          <div className="flex  flex-col flex-1 gap-1">
            <label
              htmlFor="newPassword"
              className="text-sm text-gray-700 font-bold"
            >
              New Password
            </label>
            <input className="p-2 rounded" type="password" id="newPassword" />
          </div>
          <div className="flex  flex-col flex-1 gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-gray-700 font-bold"
            >
              Confirm Password
            </label>
            <input
              className="p-2 rounded"
              type="password"
              id="confirmPassword"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-400 p-2 rounded text-base">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileDetails() {
  return (
    <form className="bg-gray-200 rounded p-8 relative flex-1">
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Profile Details
      </h3>
      <div className="flex gap-6 items-center mb-4">
        <div className="size-20 shrink-0 rounded-full bg-gray-500"></div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <button className="text-base bg-gray-400 px-4 py-2 rounded-md">
              Upload Profile Photo
            </button>
            <button className="text-base outline outline-gray-500 px-4 py-2 rounded-md">
              Delete
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Image size should be atleast 320px big, and less than 500kb. Allowed
            files .png and
          </p>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col flex-1 gap-1">
          <label htmlFor="username" className="text-sm text-gray-700 font-bold">
            Username
          </label>
          <input className="p-2 rounded" type="text" id="username" />
        </div>
        <div className="flex  flex-col flex-1 gap-1">
          <label htmlFor="email" className="text-sm text-gray-700 font-bold">
            Email
          </label>
          <input className="p-2 rounded" type="email" id="email" />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="text-base bg-gray-300 py-2 px-8 rounded">
          Save Changes
        </button>
      </div>
    </form>
  );
}
