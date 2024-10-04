type ToastProps = {
    message : string
}
const Toast = ({message} : ToastProps) => {
  return (
    <div className='absolute right-0 bottom-0 translate-x-5 transition-all'>
        <div className='flex items-center justify-center'>{message}</div>
    </div>
  )
}

export default Toast