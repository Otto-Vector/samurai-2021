import styles from './MyPosts.module.css';
import {Field, Form} from "react-final-form";
import {TextArea} from "../../common/FormType/FormType";
import {composeValidators, required} from "../../../utils/validators";
import {FormApi} from "final-form";
import {newPostTextType} from "./MyPosts";

type OwnProps = {
  newPostTextPlaceholder: string | null
  onSubmit: (formData: newPostTextType) => void
}

const AddPostForm: React.FC<OwnProps> = ({onSubmit, newPostTextPlaceholder}) => {

   // передача значений со сбросом поля ввода
  const onSubmitResetForm = (formData: newPostTextType, form: FormApi<newPostTextType,newPostTextType>) => {
    onSubmit(formData)
    // сброс значений после ввода
    form.reset()
  }

  return (
    <Form
       onSubmit={onSubmitResetForm}
        initialValues={{
          newPostText: ''
        }}
        render=
          {({handleSubmit, pristine, form, submitting, values}) => (
        <form onSubmit={handleSubmit}
              className={styles.addPostBlock}
        >
          <div className={styles.textarea}>
          <Field
                 name={'newPostText'}
                 placeholder={newPostTextPlaceholder}
                 validate={composeValidators(required)}
                 component={TextArea}
          />
          </div>

          <button type={'button'}
                      className={styles.resetButton}
                      disabled={pristine || submitting}
                      onClick={(e)=>{form.reset}}>X
              </button>
          <button type={'submit'}
                  className={styles.buttonAddPost}
          >Add post</button>
        </form>
      )}
    >
    </Form>
  )
}

export default AddPostForm
