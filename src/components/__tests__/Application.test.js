import React from "react";
import axios from 'axios';

import { render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText('Monday'));
  
    fireEvent.click(getByText('Tuesday'));
  
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  it('loads data, books an interview and reduces the spots remaining for the day by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0]
    
    fireEvent.click(getByAltText(appointment,'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment,'Save'));
    
    expect(getByText(appointment, 'Saving Interview')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving Interview'));
    
    expect(getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday'));
    
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(getByText(appointment, 'Delete the interview?')).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting Interview')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting Interview"));
 
    expect(getByAltText(appointment,'Add'));
   
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday'));
    
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Edit'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment,'Save'));

    expect(getByText(appointment, 'Saving Interview')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving Interview'));
    
    expect(getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday'));
    
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment,'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    fireEvent.click(getByText(appointment,'Save'));

    expect(getByText(appointment, 'Saving Interview')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving Interview'));
    
    expect(getByText(appointment, "Appointment not saved, please try again"));
  });

  it('shows the delete error when failing to save an appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Delete'));

    expect(getByText(appointment, 'Delete the interview?')).toBeInTheDocument();

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting Interview')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting Interview"));
 
    expect(getByText(appointment,'Appointment not deleted, please try again'));
  });
})
