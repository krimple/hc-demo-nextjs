import {FC, PropsWithChildren} from 'react';

const Home: FC<PropsWithChildren> = ({children}) => {
  return (
    <div>
      <h1>Site Header</h1>
      <section className="w-4/5 mx-auto h-auto">
        { children }
      </section>
    </div>
  );
}

export default Home;