import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import Projects from '@components/Main/Projects/Projects';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchProjects } from '@store/project/operations';
import { selectProjects } from '@store/project/selectors';

const Main = () => {
  const [refresh, setRefresh] = useState<string | undefined>('');
  const [access, setAccess] = useState<string | undefined>('');
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  console.log(projects); //TODO remove console.log

  useEffect(() => {
    dispatch(fetchProjects());
    setAccess(Cookies.get('accessToken'));
    setRefresh(Cookies.get('refreshToken'));
    console.log(refresh, access);
  }, [refresh, access, dispatch]);

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return <Projects />;
};

export default Main;
