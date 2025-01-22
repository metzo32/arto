interface ContactScrollButtonProps {
  index: number;
  totalButtons: number;
  onClick: (scrollPosition: number) => void;
}

const ContactScrollButton:React.FC<ContactScrollButtonProps> = ({ index, totalButtons, onClick }) => {

  const handleClick = () => {
      const scrollPosition = (( index / totalButtons ) + 1) % 1;
      onClick(scrollPosition)
  }
    return ( 
    <button onClick={handleClick}>{index + 1}</button>
  )
}

  export default ContactScrollButton;
