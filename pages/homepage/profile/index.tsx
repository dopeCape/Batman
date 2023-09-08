import Image from "next/image"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { auth } from "@/firebase"
import checkUser from "@/utils/checkUser"

const Profile = () => {
  const User = auth.currentUser
  const router = useRouter()

  const { theme, setTheme } = useTheme()

  const user: any = checkUser()
  if (!user) {
    window.location.href = "/auth/signin"
    return
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-dark"
      }  py-4 my-4 mx-auto w-11/12 md:w-9/12`}
      style={{ height: "100%", borderTop: "2px solid #F0F0FA" }}
    >
      <div className="mx-auto">
        <h3 className="text-2xl font-medium">My Profile</h3>
        <p>Update your profile</p>
      </div>
      <div
        className="w-11/12  mt-10 mx-auto px-3 md:px-6 flex flex-col justify-center items-start md:flex-row md:justify-between md:items-center border-2 border-light-blue rounded-md"
        style={{ height: "143px" }}
      >
        <div className="flex flex-row items-center me-5">
          <div className="rounded-full mx-2  flex  px-4 py-2 items-center justify-center cursor-pointer bg-slate-300">
            <h1 className="text-2xl w-full h-full">
              {User?.email?.charAt(0).toUpperCase()}
            </h1>
          </div>
          <p className="font-base font-medium">{User?.email}</p>
        </div>
      </div>
      <div className="w-11/12 border-2 mt-10 mx-auto flex flex-col justify-center px-6 py-5 border-light-blue rounded-md">
        <div className="mb-5">
          <h3 className="text-2xl font-medium">Personal Information</h3>
        </div>

        <div className="flex flex-col w-full md:flex-row gap-5"></div>
        <div className="flex flex-col md:flex-row mt-6 gap-5">
          <div>
            <label className="text-bleach-brown" htmlFor="email">
              Email
            </label>{" "}
            <br />
            <h1>{User?.email}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
