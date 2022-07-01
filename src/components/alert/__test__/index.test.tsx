import { fireEvent, render,screen } from "@testing-library/react";
import { mountTest } from "@/test/shared";
import Alert from "..";

describe('Testing Alert',()=>{
  mountTest(()=>(
    <Alert message='Im Alert'/>
  ))

  it('should render message and description',()=>{
    const msg = 'test message'
    const desc = "test desc"
    render(
      <Alert message={msg} description={desc}/>
    )
    expect(screen.getByText(msg)).toBeInTheDocument()
    expect(screen.getByText(desc)).toBeInTheDocument()
  })

  it('should support alert with icon',()=>{
    render(<Alert message='alert' showIcon/>)
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
  })

  it('should support closeable and trigger close callback',()=>{
    const mockFn = jest.fn()
    render(
      <Alert message='Im Alert'closeable closeCallback={mockFn}/>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockFn).toBeCalled()
  })
})