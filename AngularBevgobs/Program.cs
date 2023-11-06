// Create builder
using AngularBevgobs.DAL;
using AngularBevgobs.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ForumDbContextConnection") ?? throw new InvalidOperationException("Connection string 'ItemDbContextConnection' not found.");


// Inject MVC model into builder
builder.Services.AddControllersWithViews();

// Insert NewtonsoftJson to avoid infinite loops
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling =
     Newtonsoft.Json.ReferenceLoopHandling.Ignore;

});

// Allows us to use DB Contexts
builder.Services.AddDbContext<ForumDbContext>(options =>
{
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:ForumDbContextConnection"]);
});

// Add Identity services
builder.Services.AddDefaultIdentity<ApplicationUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+ ";
    options.Password.RequiredLength = 6;
    options.Password.RequireDigit = true; // Require at least one digit in the password
    options.Password.RequireNonAlphanumeric = true; // Require at least one non-alphanumeric character
    options.Password.RequireUppercase = true; // Require at least one uppercase letter

})
    .AddEntityFrameworkStores<ForumDbContext>();


// Configure lockout settings
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15); // Lockout duration
    options.Lockout.MaxFailedAccessAttempts = 5; // Maximum number of failed attempts before lockout
    options.Lockout.AllowedForNewUsers = false; // Whether lockout is enabled for new users
});


// Adding the Forum Repository
builder.Services.AddScoped<IForumRepository, ForumRepository>();
// Adding the Subforum Repository
builder.Services.AddScoped<ISubforumRepository, SubforumRepository>();
// Adding the Thread Repository
builder.Services.AddScoped<IThreadRepository, ThreadRepository>();

builder.Services.AddScoped<ICommentRepository, CommentRepository>();

// Logger //////////////////////////////////////////////
var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
e.Level == Serilog.Events.LogEventLevel.Information &&
e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);

// Build //////////////////////////////////////////////
var app = builder.Build();

// DB Init //////////////////////////////////////////////
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    DBInit.Seed(app);
}

app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
