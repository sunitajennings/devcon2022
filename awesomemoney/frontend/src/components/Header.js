import { Text } from '@kyper/text'

function Header() {
  return (
    <div>
      <Text as="H1" color="primary" tag="p">
        AwesomeMoney
      </Text>
      <div className='mt-8 pb-16'>
        <Text as="Paragraph" color="primary" tag="p">
          Do awesome things with your money.
        </Text>
      </div>
    </div>
  )
}

export default Header;

