import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  currentUser: any = {
    email: '',
    username: '',
    id: null,
  };
  settingsForm!: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  private selectedFile: File | undefined;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserDetails(+userId).subscribe({
        next: (user) => {
          console.log('Loaded user:', user); // Add this line
          this.currentUser = { ...user, id: +userId }; // Ensure correct assignment
          this.updateFormValues(user);
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }



  private initializeForm() {
    this.settingsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.minLength(8)]]
    });
  }

  private updateFormValues(user: any) {
    this.settingsForm.patchValue({
      email: user.email,
      username: user.username
    });
  }

  onUpdateSettings() {
    if (this.settingsForm.valid) {
      this.loading = true;

      // Ensure currentUser.id is defined and not null
      if (this.currentUser && this.currentUser.id) {
        // Prepare the updated user data
        let updatedUserData = {
          id: this.currentUser.id,
          email: this.settingsForm.value.email || this.currentUser.email,
          username: this.settingsForm.value.username || this.currentUser.username,
          password: this.settingsForm.value.password
        };

        // Remove the password from the payload if it's empty
        if (!updatedUserData.password) {
          delete updatedUserData.password;
        }

        console.log('Updating user with ID:', this.currentUser.id);
        console.log('Update data:', updatedUserData);

        this.authService.updateUserDetails(this.currentUser.id, updatedUserData).subscribe({
          next: (response) => {
            this.loading = false;
            this.successMessage = 'Update successful!';
            // Update the currentUser object with the new data
            this.currentUser = { ...this.currentUser, ...updatedUserData };
          },
          error: (err) => {
            this.errorMessage = 'Error updating user settings';
            console.error('Error updating user settings:', err);
            this.loading = false;
          }
        });
      } else {
        this.errorMessage = 'Error: User ID is undefined or null';
        console.error('Error: User ID is undefined or null');
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Error: Form is invalid';
      console.error('Error: Form is invalid', this.settingsForm.errors);
    }
  }



  imagePreviewUrl: string | null = null;

  onProfilePictureChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imagePreviewUrl = fileReader.result as string;
        }
      };
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }
}
