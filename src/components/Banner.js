import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Banner({ props }) {
     return (
          <div className="centeredOnPage">
               <h1 className="text-warning">
                    {props.isError ? <span className="text-dark">{props.span404}</span> : null}
                    {props.title}
               </h1>
               <span className="text-dark">{props.spanTitle}</span>
               <p>{props.description}</p>
               <Button as={Link} to={props.destination} className="bg-dark border border-warning text-warning">
                    {props.btn}
               </Button>
          </div>
     );
}
