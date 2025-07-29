import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, getVideoWatchProgress } from "@/store/thunks/videoThunk";
import type { AppDispatch, RootState } from "@/store/store";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeleton from "@/components/VideoCardSkeleton";
import ErrorRetry from "@/components/ErrorRetry";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allVideos, isLoading, error } = useSelector((state: RootState) => state.video);


    useEffect(() => {
        dispatch(getAllVideos());
        dispatch(getVideoWatchProgress())
    }, []);


    if (error) {
        return <ErrorRetry message={error} onRetry={() => dispatch(getAllVideos())} />
    }

    if (isLoading) {
        return (
            <div className="max-w-[1300px] mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-start gap-x-6 gap-y-10">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <VideoCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-[1300px] mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-start gap-x-6 gap-y-10">
                {allVideos && allVideos.docs && allVideos.docs.map((video) => (
                    <VideoCard key={video._id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default Home;
