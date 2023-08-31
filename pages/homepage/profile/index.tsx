import Image from "next/image";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { auth } from "@/firebase";


const Profile = () => {
    const User = auth.currentUser;
    console.log(User);
    const router = useRouter();

    const { theme, setTheme } = useTheme();

    console.log(theme)

    const cancelProfileUpdate = (e) => {
        e.preventDefault();
        router.push("/homepage")
    }

    return <form className={`${theme ==="light" ? "bg-white" : "bg-dark"}  py-4 my-4 mx-auto w-11/12 md:w-9/12`} style={{height: "100%", borderTop: "2px solid #F0F0FA"}}>
        <div className="mx-auto">
            <h3 className="text-2xl font-medium">My Profile</h3>
            <p>Update your profile</p>
        </div>
        <div className="w-11/12 mt-10 mx-auto px-3 md:px-6 flex flex-col justify-center items-start md:flex-row md:justify-between md:items-center border-2 border-light-blue rounded-md" style={{height: "143px"}}>
            <div className="flex flex-row items-center me-5">
                <Image src="/images/Ellipse.png" alt="icon" className="me-2" width={55} height={55} />
                <p className="font-base font-medium">John Doe</p>
            </div>
            <div className="flex justify-between gap-3 mt-4 md:mt-0">
                <button className="bg-dark text-white rounded-md px-2 min-w-fit hover:bg-slate-600" style={{height: "39px"}}>Upload new picture</button>
                <button className="bg-bleach-red text-light-red-100 rounded-md px-2 hover:bg-red-200" style={{height: "39px"}}>Remove</button>
            </div>
        </div>
        <div className="w-11/12 border-2 mt-10 mx-auto flex flex-col justify-center px-6 py-5 border-light-blue rounded-md">
            <div className="mb-5">
                <h3 className="text-2xl font-medium">Personal Information</h3>
                <p>update your personal information</p>
            </div>
            <div>
                <label className="text-bleach-brown" htmlFor="name">Name</label> <br />
                <input type="text" name="name" value={User ? User.displayName : ""} id="name" 
                    className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
            </div>
            <div className="flex flex-col w-full md:flex-row gap-5">
                
            </div>
            <div className="flex flex-col md:flex-row mt-6 gap-5">
                <div>
                    <label className="text-bleach-brown" htmlFor="email">Email</label> <br />
                    <input type="email" name="email" defaultValue={User ? User.email : ""} id="email" 
                        className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
                </div>
                <div>
                    <label className="text-bleach-brown" htmlFor="number">Phone Number</label> <br />
                    <input type="text" name="number" defaultValue={User ? User.phoneNumber : ""} id="number" 
                        className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
                </div>
            </div>
        </div>
        <div className="w-11/12 mx-auto border-2 mt-10 flex flex-col justify-center px-6 py-5 border-light-blue rounded-md">
            <div className="mb-5">
                <h3 className="text-2xl font-medium">Change Password</h3>
                <p>Your new password must be different from the previous used passwords</p>
            </div>
            <div className="md:flex gap-4">
                <div>
                    <label className="text-bleach-brown" htmlFor="password">Current Password</label> <br />
                    <input type="password" name="password" id="password" value="test123"
                        className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
                </div>
                <div>
                    <label className="text-bleach-brown" htmlFor="password">New Password</label> <br />
                    <input type="password" name="password" id="password" 
                        className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row mt-6 gap-5">
                
                <div>
                    <label className="text-bleach-brown" htmlFor="password">Confirm New Password</label> <br />
                    <input type="password" name="password" id="password" 
                        className="ps-3 w-full placeholder:font-medium border-2 border-light-blue placeholder:text-dark-brown rounded-md" style={{height: "37px"}} />
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-8 gap-5">
            <button onClick={cancelProfileUpdate} className="rounded-md text-blue hover:bg-slate-300" style={{border: "1px solid #0653EA", width: "120px", height: "40px"}}>Cancel</button>
            <button className="bg-blue-700 hover:bg-blue-600 rounded-md text-white" style={{width: "120px", height: "40px"}}>Save</button>
        </div>
    </form>
}

export default Profile;