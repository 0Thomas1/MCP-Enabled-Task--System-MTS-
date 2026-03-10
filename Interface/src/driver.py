import util
from mongoModel import MongoModel
from pixooDriver import PixooDriver 

pixoo_ip = util.enum['PIXOO_IP']
username = util.enum['USER_NAME']


# init_pixoo() function
def init_pixoo():
  pixoo = PixooDriver(pixoo_ip)
  return pixoo

# init_model() function
def init_model(name):
  model = MongoModel(name)
  if model.client is None:
    print('Failed to connect to MongoDB')
    exit(1)
  return model

pixoo = init_pixoo()
mongo = init_model(username)

def main():  
  while True:
    try:
      in_progress_tasks = mongo.get_task_by_status("inProgress")
      todo_tasks = mongo.get_task_by_status("todo")
      
      pixoo.draw_all_tasks(in_progress_tasks, "In Progress")
      pixoo.draw_all_tasks(todo_tasks, "To Do")

    except KeyboardInterrupt:
      print('[!] Exiting...')
      pixoo.revert_display()
      exit(0)
    except Exception as e:
      print(f'[!] Unexpected error: {e!r}')
      pixoo.revert_display()
      exit(0)
    

if __name__ == "__main__":
  main() 

  