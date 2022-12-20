import ContentLogIn from 'src/components/modal/content/log-in/ContentLogIn';
import ContentSignUp from 'src/components/modal/content/sign-up/ContentSignUp';

export enum ModalsContent {
  Default = '',
  LogIn = 'LOGIN',
  SignUp = 'SIGNUP'
}

export const getModalContent = (content: ModalsContent) => {
  switch (content) {
    case ModalsContent.LogIn:
      return <ContentLogIn />;

    case ModalsContent.SignUp:
      return <ContentSignUp />;

    default:
      return null;
  }
};
