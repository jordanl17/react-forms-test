import React, { Component } from 'react';
import './App.css';
import { Formik, Form, ErrorMessage, Field, FieldArray, arrayHelpers } from 'formik';
import * as yup from 'yup';
import SearchComponent from './searchComponent';

class App extends Component {
  constructor() {
    super();

    this.state = {
      test: 'hello',
      submitCount: 0
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Formik
            initialValues={
              {
                email: '',
                comment: '',
                list: [
                  { name: 'one', checked: false, },
                  { name: 'two', checked: false },
                  { name: 'three', checked: false }
                ]
              }
            }
            validate={(values => {
              let errors = {};
              const isOneChecked = values.list.some(element => element.checked);
              if (!isOneChecked) {
                errors.list = 'must select at least one from list'
              }
              return errors;
            })}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={
              yup.object().shape({
                email: yup.string()
                  .email('not a valid email')
                  .required('must be entered'),
                comment: yup.string()
                .min(4, 'must be 4 chars')
                .required('must be entered')
              })
            }
            onSubmit={(values, { setSubmitting }) => {
              console.log('hello')
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, dirty, values, submitCount }) => (
              <Form>
                <Field type="email" name="email" placeholder="email please" />
                {submitCount} {isSubmitting ? 'true': 'false'}
                { submitCount > 0 && <ErrorMessage name="email" component="div" /> }
                <Field type="comment" name="comment" placeholder="comment please" />
                { submitCount > 0 && <ErrorMessage name="comment" component="div" /> }
                <FieldArray name="list"
                  render={arrayHelpers => (
                    <React.Fragment>
                      {values.list.map((value, index) => {
                        return (
                          <div key={value.name}> {value.name}
                            <input
                              key={value.name}
                              type='checkbox'
                              name={value.name}
                              checked={value.checked}
                              onChange={() =>
                                arrayHelpers
                                  .replace(index,
                                    {
                                      ...value,
                                      checked: !values.list[index].checked
                                    })}
                            />
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )} />
                  { submitCount > 0 && <ErrorMessage name="list" component="div" /> }
                <button type="go" disabled={isSubmitting || !dirty}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </header>
        <SearchComponent />
      </div>
    );
  }
}

export default App;
