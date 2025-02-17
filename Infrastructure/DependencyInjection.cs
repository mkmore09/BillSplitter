using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Persistence;
using Domain.Interfaces;
using Application.Data.ServiceAbstraction;
using Application.Data.Services;
using Application.Other;
using Infrastructure.Repositories.Authentication;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<IExpenseRepository, ExpenseRepository>();
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));
            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>(); 
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IExpenseService,ExpenseService>() ;
            services.AddHttpContextAccessor();
            return services;
        }
    }
}
