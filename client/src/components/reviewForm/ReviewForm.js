import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, rvText, labelText, defaultValue }) => {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label>{labelText}</Form.Label>
        <Form.Control ref={rvText} as="textarea" row={3} defaultValue={defaultValue} />
      </Form.Group>
      <Button variant='outline-info' onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default ReviewForm