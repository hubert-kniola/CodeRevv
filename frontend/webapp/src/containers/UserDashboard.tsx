import { FC } from 'react';

import { MainPanel } from 'components';

import { DashNavbar, TestEditor, UserFeed, TestList } from 'containers';
import { useParams } from 'react-router-dom';

type RouteParams = {
  verb?: string;
  resource?: string;
  id?: string;
};

export const UserDashboard: FC = () => {
  const { verb, resource, id } = useParams<RouteParams>();

  let MainComponent: FC | null = null;

  if (verb && resource) {
    if (verb === 'create') {
      if (resource === 'test') {
        MainComponent = TestEditor;
      } else if (resource === 'group') {
        //TODO
      }
    } else if (verb === 'view') {
      if (resource === 'tests') {
        MainComponent = TestList;
      } else if (resource === 'groups') {
        //TODO
      }
    } else if (verb === 'edit' && id) {
      if (resource === 'test') {
        //TODO
      } else if (resource === 'group') {
        //TODO
      }
    }
  }

  if (!MainComponent) {
    MainComponent = UserFeed;
  }

  return (
    <>
      <DashNavbar />

      <MainPanel>
        <MainComponent />
      </MainPanel>
    </>
  );
};
