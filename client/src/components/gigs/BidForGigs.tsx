import { getGigBid } from '@/redux/Features/bidSlices';
import { useAppDispatch } from '@/redux/hooks';
import  { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ListBids from '../bits/ListBids';

const BidForGigs = () => {

  const dispatch = useAppDispatch();
  const { gigId } = useParams<{ gigId: string }>();
  const { bids } = useSelector((state: any) => state.bid);

  useEffect(() => {
    if (gigId) {
      dispatch(getGigBid(gigId));
    }
  }, [gigId]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Bids for this Gig</h1>
      <ListBids bids={bids} buttons={["all"]} />
    </div>
  )
}

export default BidForGigs