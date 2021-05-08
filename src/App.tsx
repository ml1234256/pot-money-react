import './App.scss';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Detail from 'views/Detail';
import Money from 'views/Money';
import { EditTags } from 'views/EditTags';
import Statistics from 'views/Statistics';
import NotFound from 'views/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Redirect exact from="/" to="/detail" />
          <Route exact path="/detail">
            <Detail />
          </Route>
          <Route exact path="/money">
            <Money />
          </Route>
          <Route exact path="/editTags">
            <EditTags />
          </Route>
            <Route exact path="/statistics">
            <Statistics />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
    </Router>
  
    </div>
  );
}

export default App;
