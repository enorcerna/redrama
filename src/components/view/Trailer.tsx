import {Button} from "../ui/button";
import {Icon} from "@iconify/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";

interface Props {
  code: string;
}
function Trailer({code}: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Icon icon="tabler:brand-youtube" /> Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center space-x-2">
            <iframe
              src={`https://www.youtube.com/embed/${code}?autoplay=0&autohide=0&enablejsapi=1&wmode=opaque`}
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Trailer;
