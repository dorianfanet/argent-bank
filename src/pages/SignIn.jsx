import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Form from '../components/SignInForm'

export default function SignIn() {

  function handleSubmit(data) {
    console.log(data)
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} className='sign-in-icon' />
        <h1>Sign In</h1>
        <Form
          buttonText={'Sign In'}
          onFormSubmit={handleSubmit}
        />
      </section>
    </main>
  )
}