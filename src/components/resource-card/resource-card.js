import Accordion from 'react-bootstrap/Accordion'


const ResourceCard = (props) => {
    <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0">
    <Accordion.Header>{props.title}</Accordion.Header>
    <Accordion.Body>
      {props.description}
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
}