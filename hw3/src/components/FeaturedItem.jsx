import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

export default function FeaturedItem(props) {
  const [showNut, setNut] = useState(false);

  const handleShow = () => {
    setNut(!showNut);
  };

  const headers = Object.keys(props.nutrition);
  
  return (
    <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
      <img src={props.img} alt={props.name} width={600} height={600} />
      <p>
        <b>{props.name}</b>
      </p>
      <p>
        <b>{props.price} per unit</b>
      </p>
      <p>{props.description}</p>
      {showNut && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers.map((key) => (
                <th key={key}><b>{key}</b></th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.map((key) => (
                <td key={key}>{props.nutrition[key]}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
      
      <Button onClick={handleShow}>
        {showNut ? "Hide Nutrition Facts" : "Show Nutrition Facts"}
      </Button>
    </Card>
  );
}
