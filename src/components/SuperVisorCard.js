import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

import {
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function SuperVisorCard(props) {

  const navigate = useNavigate();
  async function chatFW() {
    props.setChatDirect({email: props.email, name: props.name, area: props.area});
    navigate("/sup/chat");
  }

  return (
    <Card className="max-w-[20rem] max-h-[30rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="ui/ux review check"
        />
      </CardHeader>
      <CardBody>
        <div className="flex justify-center">
          <Typography variant="h5" color="blue-gray">
            {props.name}
          </Typography>
          <button style={{ width: "1.6rem", marginLeft: "0.7rem" }} onClick={chatFW}>
            <ChatBubbleLeftRightIcon color="blue" fontSize={16} />
          </button>
        </div>
        {/* <Typography variant="lead" color="gray" className="mt-3 font-normal">
            Because it&apos;s about motivating the doers. Because I&apos;m here to
            follow my dreams and inspire others.
          </Typography> */}
        <Typography variant="h5" color="blue-gray" className="mt-3 font-semibold">
          Sub Division: {props.area}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default SuperVisorCard;