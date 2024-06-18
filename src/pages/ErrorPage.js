import Banner from "../components/Banner";

export default function Home() {
     const bannerDetails = {
          title: " Not Found",
          span404: "404 ",
          description: "Something went wrong, please go back to home page",
          btn: "go back to home",
          destination: "/",
          isError: true
     };
     return <Banner props={bannerDetails} />;
}
