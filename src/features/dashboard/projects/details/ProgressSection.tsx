import FeedbacksList from "./components/FeedbacksList";
import VideoUpload from "./components/VideoUpload";
import VideoVersionList from "./components/VideoVersionList";

const ProgressSection = () => {
  return (
    <section className="space-y-6 bg-white rounded-6 p-3">
      <VideoUpload />

      <VideoVersionList />

      <FeedbacksList />
    </section>
  );
};

export default ProgressSection;
