import profile from "../assets/Profile.png";

const ProfileCard = () => (
    <div className="flex items-start bg-white p-4 mx-4 mt- shadow-lg rounded-xl">
        {/* Profile Image (using a placeholder for a smooth look) */}
        <div className="w-20 h-20 shrink-0 mr-4 rounded-full overflow-hidden border-2 border-gray-200">
            <img className="w-full h-full text-gray-500" src={profile} alt="profile"></img>
        </div>

        <div className="grow">
            <h2 className="text-lg font-bold text-gray-800">Alex Ariza</h2>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#1891ED]">Username:</span> alex422@gmail.com
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#1891ED]">Role:</span> Contractor
            </p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#1891ED]">Emp ID:</span> ax299016
            </p>
        </div>

        <button className="text-sm text-[#1891ED] font-medium self-start mt-1 p-1 hover:text-blue-800 transition duration-150">
            edit
        </button>
    </div>
);

export default ProfileCard;