import requests
import sys

def validate_connection(url):
    """Validates the connection to the provided URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        print(f"Successfully connected to {url}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to {url}: {e}")
        return False

def print_todos(todos):
    """Prints the list of todos"""
    if not todos:
        print("No todos available.")
    else:
        for todo in todos:
            status = "Completed" if todo['completed'] else "Pending"
            print(f"ID: {todo['id']}, Text: {todo['text']}, Status: {status}")

def get_todos(base_url):
    """Fetches all todos from the server"""
    try:
        response = requests.get(f"{base_url}")
        response.raise_for_status()
        todos = response.json()
        print_todos(todos)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching todos: {e}")

def add_todo(base_url):
    """Adds a new todo to the server"""
    text = input("Enter the text for the new todo: ")
    if text.strip() == "":
        print("Todo text cannot be empty.")
        return
    try:
        response = requests.post(f"{base_url}", json={"text": text})
        response.raise_for_status()
        new_todo = response.json()
        print(f"Todo added successfully: {new_todo}")
    except requests.exceptions.RequestException as e:
        print(f"Error adding todo: {e}")

def delete_todo(base_url):
    """Deletes a todo by ID"""
    try:
        todo_id = int(input("Enter the ID of the todo to delete: "))
        response = requests.delete(f"{base_url}/{todo_id}")
        response.raise_for_status()
        print("Todo deleted successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Error deleting todo: {e}")
    except ValueError:
        print("Invalid ID. Please enter a valid number.")

def toggle_todo(base_url):
    """Toggles the completion status of a todo"""
    try:
        todo_id = int(input("Enter the ID of the todo to toggle: "))
        response = requests.patch(f"{base_url}/{todo_id}")
        response.raise_for_status()
        updated_todo = response.json()
        status = "Completed" if updated_todo['completed'] else "Pending"
        print(f"Todo updated: ID: {updated_todo['id']}, Status: {status}")
    except requests.exceptions.RequestException as e:
        print(f"Error toggling todo: {e}")
    except ValueError:
        print("Invalid ID. Please enter a valid number.")

def main():
    """Main function to interact with the user"""
    # Prompt user for the server URL
    base_url = input("Please enter the server URL (e.g., http://localhost:80): ").strip() + '/api/todos'

    # Validate the server URL and connection
    if not base_url.startswith("http://") and not base_url.startswith("https://"):
        print("Invalid URL format. Make sure the URL starts with http:// or https://")
        sys.exit(1)

    if validate_connection(base_url):
        while True:
            print("\nTo-Do List CLI")
            print("1. Get all todos")
            print("2. Add a new todo")
            print("3. Delete a todo")
            print("4. Toggle a todo completion status")
            print("5. Exit")

            choice = input("\nChoose an option: ")

            if choice == '1':
                get_todos(base_url)
            elif choice == '2':
                add_todo(base_url)
            elif choice == '3':
                delete_todo(base_url)
            elif choice == '4':
                toggle_todo(base_url)
            elif choice == '5':
                print("Goodbye!")
                sys.exit(0)
            else:
                print("Invalid option. Please choose a valid number.")
    else:
        print("Unable to connect to the server. Exiting...")
        sys.exit(1)

if __name__ == "__main__":
    main()
