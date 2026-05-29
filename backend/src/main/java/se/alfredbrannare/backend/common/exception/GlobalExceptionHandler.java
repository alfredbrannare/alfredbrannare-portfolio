package se.alfredbrannare.backend.common.exception;

import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import se.alfredbrannare.backend.storage.exception.InvalidFileTypeException;
import se.alfredbrannare.backend.storage.exception.StorageException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<String> handleNotFound(ResourceNotFoundException exception) {
    log.warn("Not found: {}", exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidation(MethodArgumentNotValidException exception) {
    String message =
        exception.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.joining(", "));
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
  }

  @ExceptionHandler(ResourceAlreadyExistsException.class)
  public ResponseEntity<String> handleAlreadyExists(ResourceAlreadyExistsException exception) {
    log.warn("Already exists: {}", exception.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
  }

  @ExceptionHandler(InvalidFileTypeException.class)
  public ResponseEntity<String> handleInvalidFileType(InvalidFileTypeException exception) {
    log.warn("Invalid file type: {}", exception.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
  }

  @ExceptionHandler(StorageException.class)
  public ResponseEntity<String> handleStorage(StorageException exception) {
    log.error("Storage failure: {}", exception.getMessage(), exception);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to store file");
  }
}
