const { default: classNames } = require("classnames")

const Modal = (props) => {
  const { open, children, className } = props

  if (!open) {
    return null
  }

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 w-full object-center h-screen overflow-auto rounded-md border-2 border-indigo-600   ",
          className
        )}
      >
        <div>{children}</div>
      </div>
    </>
  )
}

export default Modal
