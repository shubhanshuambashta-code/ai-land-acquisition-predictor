# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ai-land-acquisition-predictor.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit: `git commit -am 'Add your feature'`
6. Push: `git push origin feature/your-feature`
7. Submit a pull request

## Code Style

### JavaScript/React
- Use functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for all functions
- Keep components small and focused
- Use destructuring for props and imports

### Example Component
```javascript
/**
 * MyComponent - Description of what it does
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @returns {JSX.Element}
 */
const MyComponent = ({ title }) => {
  return <div>{title}</div>;
};

export default MyComponent;
```

### CSS/Styling
- Use TailwindCSS utility classes
- Only use custom CSS for complex layouts
- Keep color palette consistent
- Use semantic class names

## Git Workflow

1. **Create a branch** for each feature/fix
2. **Keep commits atomic** - one change per commit
3. **Use clear commit messages**:
   - `feat: Add user authentication`
   - `fix: Resolve memory leak in chart component`
   - `docs: Update API documentation`
   - `style: Format code with Prettier`
   - `test: Add unit tests for helpers`

## Pull Request Process

1. **Update the README** if you're adding features
2. **Add tests** for new functionality
3. **Test locally** before submitting
4. **Write a clear PR description** explaining:
   - What problem does it solve?
   - How does it solve it?
   - Any breaking changes?
5. **Link related issues** using "Closes #123"
6. **Request review** from maintainers

## Coding Standards

### Do's
- ✅ Write clear, self-documenting code
- ✅ Add comments for complex logic
- ✅ Use TypeScript types (JSDoc comments)
- ✅ Handle errors gracefully
- ✅ Test your changes
- ✅ Keep dependencies updated
- ✅ Follow the existing code style

### Don'ts
- ❌ Don't commit `.env` files
- ❌ Don't add large dependencies without discussion
- ❌ Don't use `any` or loose typing
- ❌ Don't hardcode values
- ❌ Don't ignore console errors
- ❌ Don't merge your own PRs

## Performance Considerations

- Use React.memo for expensive components
- Implement code splitting for large pages
- Optimize images and assets
- Avoid unnecessary re-renders
- Use pagination for large lists
- Implement lazy loading where appropriate

## Accessibility (a11y)

- Use semantic HTML elements
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios (WCAG AA)
- Use proper heading hierarchy

## Testing

Write tests for:
- Utility functions
- API services
- Complex components
- Error handling

```javascript
describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBe('Jan 15, 2024');
  });
});
```

## Documentation

- Add JSDoc comments to all functions
- Update README for user-facing changes
- Document API endpoints
- Add examples for complex features
- Keep documentation up-to-date

## Issues

### Reporting Bugs
- Describe the issue clearly
- Include steps to reproduce
- Add screenshots/videos if applicable
- Specify environment (OS, browser, version)
- Check existing issues first

### Requesting Features
- Explain the use case
- Describe desired behavior
- Suggest implementation approach
- Consider alternatives

## Development Tips

1. **Use React DevTools** - Debug component state and props
2. **Use Redux DevTools** - If implementing Redux
3. **Check browser console** - For errors and warnings
4. **Test on multiple browsers** - Ensure compatibility
5. **Test on mobile** - Check responsive design
6. **Use Lighthouse** - Audit performance

## Need Help?

- Check the README and documentation
- Search existing issues and discussions
- Ask in the discussions tab
- Open an issue for help

## Code Review Checklist

Before submitting:
- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] Tests written and passing
- [ ] No console errors or warnings
- [ ] Performance impact assessed
- [ ] Accessibility considered
- [ ] Documentation updated
- [ ] Commits are atomic and clear

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
