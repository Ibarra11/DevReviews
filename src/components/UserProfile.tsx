export default function UserProfile() {
  return (
    <div className="flex items-center gap-4 ">
      <div className="h-8 w-8 bg-gray-500 rounded-full"></div>
      <div className="flex flex-col gap-1 text-gray-500">
        <h4 className="text-lg">Username</h4>
        <p className="text-sm">View Profile</p>
      </div>
    </div>
  );
}
