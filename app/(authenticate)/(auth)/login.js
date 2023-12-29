import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { FormRow, Alert, Logo } from '../../../components';
import { useAppContext } from '../../../context/appContext';
import { useRouter, Redirect } from 'expo-router';

export default function Register() {

  const { isMember, switchRegisterLogin, isLoading, showAlert, loginUser } = useAppContext();
  
  if (!isMember) return <Redirect href="/register" />;
  
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => loginUser(values)}
        >
          {
            (props) =>
              <View >
                <Logo style={styles.icon} />
                <Text style={styles.title}>Login</Text>
                {showAlert && <Alert />}
                <FormRow
                  onChangeText={props.handleChange('email')}
                  value={props.values.email}
                  name='Email'
                />
                <FormRow
                  onChangeText={props.handleChange('password')}
                  value={props.values.password}
                  name='Password'
                />
                <TouchableOpacity style={styles.btn} onPress={props.handleSubmit} disabled={isLoading} >
                  <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.txt}>Not a member yet? <Text style={styles.txtBtn} onPress={() => switchRegisterLogin()}>Register</Text></Text>
                <Text style={styles.txt}>Forgot password? <Text style={styles.txtBtn} onPress={() => { router.push('/forgot-password'); }}>Click here</Text></Text>
              </View>
          }
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  form: {
    borderTopColor: '#2cb1bc',
    borderTopWidth: 4,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignContent: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 48,
  },
  txt: {
    marginTop: 8,
  },
  txtBtn: {
    color: '#2cb1bc',
    letterSpacing: 1,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2cb1bc',
    marginVertical: 16,
  },
  btnTxt: {
    fontSize: 16,
    letterSpacing: 1,
    color: '#fff',
  },
});
