import { Fragment } from 'react';
import MainNavigation from './main-navigation';

// import style from './layout.module.css';

export default function Layout(props) {
    // 로그인시에는 main-nav가 보여야하고 로그인창에선 보이면 X

    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    );
}
