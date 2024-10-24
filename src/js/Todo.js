import initialRender from './initialRender.js';
import listener from './listener.js';

class Todo {
    init() {
        initialRender();
        listener()
    }
}

export default Todo;