import CloseIcon from "../assets/closeicon.svg";
import DownloadIcon from "../assets/downloadicon.svg";
import LinkIcon from "../assets/linkicon.svg";
import PendingImg from "../assets/drawingpreview.png";
import ApprovedImg from "../assets/approvedimg.png";
import RevisionImg from "../assets/revisionimg.png";

type DrawingPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  fileId: string;
  file: {
    id: string;
    name: string;
    size: string;
    status: string;
  } | null;
};

export default function DrawingPreviewModal({
  open,
  onClose,
  fileId,
}: DrawingPreviewModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-[96%] max-w-[1100px] max-h-[95vh] bg-white rounded-2xl overflow-auto scroll-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="lg:px-6 px-3 py-4 border-b flex md:items-center items-start justify-between gap-2">
          <div className="flex md:flex-row flex-col justify-start gap-4 md:items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-[#111827]">
                Architectural Plans
              </h2>
              <p className="text-sm text-[#6B7280]">PEB-1021</p>
            </div>

            <div className="flex flex-wrap items-center lg:gap-10 gap-3 text-sm text-[#111827]">
              <div>
                <p className="text-[#6B7280] max-w-[200px] min-w-[100px]">Location</p>
                <p>Pune, Maharashtra</p>
              </div>
              <div>
                <p className="text-[#6B7280] max-w-[200px] min-w-[100px]">Uploaded By</p>
                <p>Rahul Sharma</p>
              </div>
              <div>
                <p className="text-[#6B7280] max-w-[200px] min-w-[100px]">Received on</p>
                <p>25-April-2025</p>
              </div>
            </div>
          </div>

          <img
            src={CloseIcon}
            className="w-4 cursor-pointer mt-2 md:mt-0"
            onClick={onClose}
            alt=""
          />
        </div>

        <div className="bg-[#F9FAFB] flex justify-center items-center lg:px-6 px-3 py-4">
          <img
            src={
                fileId === "Approved"
                ? ApprovedImg
                : fileId === "Revision"
                ? RevisionImg
                : PendingImg
            }
            alt="drawing"
            className="max-h-[450px] object-contain"
            />

        </div>

        <div className="lg:px-6 px-3 py-4 flex sm:flex-row flex-col gap-3 sm:justify-between items-end sm:items-center border-t">
          <button className="flex items-center gap-2 bg-[#9CA3AF] text-white px-5 py-1 rounded-full w-fit">
            <img src={DownloadIcon} className="brightness-[10]" alt="" />
            Download
          </button>

          <div className="flex gap-3 items-center">
            {fileId !== "Pending" && (
              <>
                <p className="text-black text-sm">31-April-2025</p>
              </>
            )}
            {fileId !== "Approved" && (
              <button className="bg-[#F59E0B] text-white px-6 py-1 rounded-full">
                {fileId == "Revision"
                  ? "Sent for Revision"
                  : "Revision Required"}
              </button>
            )}
            {fileId !== "Revision" && (
              <button className="bg-[#22C55E] text-white px-6 py-1 rounded-full">
                {fileId == "Approved" ? "Approved" : "Approve"}
              </button>
            )}
          </div>
        </div>
        {fileId == "Pending" && (
          <div className="lg:px-6 px-3 py-3 border-t flex sm:gap-4 gap-2 items-center">
            <div className="h-[40px] border rounded-lg flex items-center gap-1 flex-1 sm:px-4 px-2">
              <input
                placeholder="Type your Comment..."
                className="flex-1 outline-none"
              />
              <img src={LinkIcon} alt="" />
            </div>
            <button className="bg-[#2563EB] text-white sm:px-6 px-3 py-2 h-10 rounded-lg">
              Send <span className="hidden sm:inline-block">Comment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
