import { getIO } from "../socket/socket";

// after hire success

export const notifyHiredFreelancer = (gig: any, freelancerId: any) => {
  const io = getIO();
  io.to(freelancerId.toString()).emit("hired", {
    message: `You have been hired for "${gig.title}"`,
    gigId: gig._id,
  });
};
