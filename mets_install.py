import subprocess
import os
interface_dir = os.path.join(os.getcwd(), 'Interface')
MCP_dir = os.path.join(os.getcwd(), 'Kanban_MCP')
def interface_install_dependencies():
    try:
        subprocess.check_call(['pip3', 'install', '-r', os.path.join(interface_dir, 'requirements.txt')])
        print("Interface dependencies installed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error installing interface dependencies: {e}")

def MCP_install_dependencies():
    try:
        subprocess.check_call(['npm', 'install'], cwd=MCP_dir)
        print("MCP dependencies installed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error installing MCP dependencies: {e}")

def mcp_build():
    try:
        subprocess.check_call(['npm', 'run', 'build'], cwd=MCP_dir)
        print("MCP built successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error building MCP: {e}")

if __name__ == "__main__":
    interface_install_dependencies()
    MCP_install_dependencies()
    mcp_build()
