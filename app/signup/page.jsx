
import SignUp from "@/components/SignUp";
const Home = () => {
 
  return (
    <div>
      <div className="h-screen px-48 w-full py-32 bg-blue-100 relative flex flex-row">
        <div className="flex flex-row h-full w-full shadow-xl rounded-2xl">
          <div className="basis-1/2 border-amber-600 bg-slate-50 h-full rounded-l-2xl">
            <SignUp/>
          </div>
          <div className="basis-1/2 border-amber-600 bg-slate-300 h-full rounded-r-2xl ">
            <video
              className="w-full h-full rounded-r-2xl"
              autoPlay
              muted
              src="/landing/doctor5.mp4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
