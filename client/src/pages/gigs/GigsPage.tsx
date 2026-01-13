import ListGigs from "@/components/gigs/ListGigs";
import { getGigs } from "@/redux/Features/gigSlices";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const GigsPage = () => {
  const dispatch = useAppDispatch();

  const { gigs, isloading } = useSelector((state: any) => state.gig);

  useEffect(() => {
    dispatch(getGigs());
  }, [dispatch]);

  return (
    <div>
      <ListGigs gigs={gigs} isloading={isloading} buttons="all" />
    </div>
  );
};

export default GigsPage;
