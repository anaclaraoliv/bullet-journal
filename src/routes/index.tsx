import { Routes, Route} from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage.tsx';
import ErrorPage from '../pages/ErrorPage/ErrorPage.tsx';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            {/*<Route path="/Calendar" element={<Calendar/>}/>*/}
            {/*<Route path="/Statistics" element={<Statistics/>}/>*/}
            <Route path="*" element={<ErrorPage/>} />
        </Routes>
    );
};

export default AppRoutes;