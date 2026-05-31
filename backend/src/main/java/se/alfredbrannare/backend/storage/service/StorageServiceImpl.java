package se.alfredbrannare.backend.storage.service;

import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import se.alfredbrannare.backend.storage.config.R2Properties;
import se.alfredbrannare.backend.storage.exception.InvalidFileTypeException;
import se.alfredbrannare.backend.storage.exception.StorageException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {
  private final S3Client s3Client;
  private final R2Properties props;

  @Override
  public String upload(MultipartFile file) {
    String ext = extensionFrom(file.getContentType());
    String key = "projects/" + UUID.randomUUID() + "." + ext;

    try {
      s3Client.putObject(
          PutObjectRequest.builder()
              .bucket(props.bucket())
              .key(key)
              .contentType(file.getContentType())
              .build(),
          RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
    } catch (IOException e) {
      throw new StorageException("Failed to upload " + key, e);
    }

    return props.publicBase() + "/" + key;
  }

  private String extensionFrom(String contentType) {
    if (contentType == null) {
      throw new InvalidFileTypeException("Content type must not be null");
    }

    return switch (contentType) {
      case "image/png" -> "png";
      case "image/jpeg" -> "jpg";
      case "image/webp" -> "webp";
      default -> throw new InvalidFileTypeException("Unsupported content type: " + contentType);
    };
  }
}
