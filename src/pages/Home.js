import { useContext } from "react";
import Banner from "../components/Banner";
import UserContext from "../UserContext";

export default function Home() {
     const { user } = useContext(UserContext);
     const bannerDetails = {
          title: "Movies",
          spanTitle: "Hub",
          description: "Watch and Stream your favorite movies",
          btn: user.isAdmin ? "go to dashboard" : "explore movies",
          destination: user.isAdmin ? "/adminView" : "/movies",
     };
     return <Banner props={bannerDetails} />;
}
