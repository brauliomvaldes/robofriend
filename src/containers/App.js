import { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
//import { robots } from './robots'
import Scroll from '../components/Scroll';
import './App.css'

//const App = ()=>{
class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield : ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=>this.setState({robots : users}));
    }

    onSearchChange = (event)=>{
        this.setState({searchfield: event.target.value})
    }

    render(){
        // desectructuramos para un codigo más limpio
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot=>{
            return robot.name.toLowerCase()
            .includes(searchfield.toLowerCase())
        })
        // robots.length === 0
        return !robots.length ? 
            <h1>Loading ...</h1> :
            (
                <div  className='tc'>
                    <h1 className="f2">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filterRobots}/>
                    </Scroll>
                </div>
            );
    }
}


export default App;
