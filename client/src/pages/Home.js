import ImgList from "../components/ui/ImgList"
import ImgUploadInput from "../components/ui/ImgUploadInput";
import InfoCard from "../components/ui/InfoCard"

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <InfoCard/>
          <ImgUploadInput />
        </div>
        <div className="col-8">
          <ImgList />
        </div>
      </div>
    </div>
  )
}

export default Home;