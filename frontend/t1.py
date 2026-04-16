import os

# Path to your images folder
folder_path = r"C:\Users\Abirami Ramanathan\scribbles-club-website\frontend\public\Tote bag and resin art\Tote bag and resin art"

# Supported image extensions
image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff')

def rename_images(folder):
    try:
        # Get all files in the folder
        files = os.listdir(folder)
        
        # Filter only image files
        images = [f for f in files if f.lower().endswith(image_extensions)]
        
        # Sort files to maintain consistent order
        images.sort()
        
        # Counter for new names
        counter = 1
        
        # Rename each image
        for old_name in images:
            # Get the file extension
            file_extension = os.path.splitext(old_name)[1]
            
            # Create new name
            new_name = f"image{counter}{file_extension}"
            
            # Create full paths
            old_path = os.path.join(folder, old_name)
            new_path = os.path.join(folder, new_name)
            
            # Rename the file
            os.rename(old_path, new_path)
            print(f"Renamed: {old_name} -> {new_name}")
            
            counter += 1
        
        print(f"\n✅ Successfully renamed {counter-1} images!")
        
    except FileNotFoundError:
        print(f"❌ Error: Folder not found at {folder_path}")
    except PermissionError:
        print("❌ Error: Permission denied. Make sure no files are open.")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

# Run the function
if __name__ == "__main__":
    print(f"Renaming images in: {folder_path}")
    print("-" * 50)
    rename_images(folder_path)